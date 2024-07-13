import {
  CPShareIcon,
  EmailShareIcon,
  FacebookShareIcon,
  LinkedinShareIcon,
  MessageFacebookShareIcon,
  PinterestShareIcon,
  QRShareIcon,
  XShareIcon,
} from "@/icons";
import { useModalStore } from "@/stores/modal-store";
import { Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
import { LiaTelegramPlane } from "react-icons/lia";
import { toast } from "sonner";
import { QRCode } from "react-qrcode-logo";
import { PostType } from "@/api/post";

export const ShareModalKey = "ShareModal";

const svgLogo = (fgColor: string) => `
<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000">
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
    <title>instagram [#167]</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="Dribbble-Light-Preview" transform="translate(-340.000000, -7439.000000)" fill="${fgColor}">
        <g id="icons" transform="translate(56.000000, 160.000000)">
          <path d="M289.869652,7279.12273 C288.241769,7279.19618 286.830805,7279.5942 285.691486,7280.72871 C284.548187,7281.86918 284.155147,7283.28558 284.081514,7284.89653 C284.035742,7285.90201 283.768077,7293.49818 284.544207,7295.49028 C285.067597,7296.83422 286.098457,7297.86749 287.454694,7298.39256 C288.087538,7298.63872 288.809936,7298.80547 289.869652,7298.85411 C298.730467,7299.25511 302.015089,7299.03674 303.400182,7295.49028 C303.645956,7294.859 303.815113,7294.1374 303.86188,7293.08031 C304.26686,7284.19677 303.796207,7282.27117 302.251908,7280.72871 C301.027016,7279.50685 299.5862,7278.67508 289.869652,7279.12273 M289.951245,7297.06748 C288.981083,7297.0238 288.454707,7296.86201 288.103459,7296.72603 C287.219865,7296.3826 286.556174,7295.72155 286.214876,7294.84312 C285.623823,7293.32944 285.819846,7286.14023 285.872583,7284.97693 C285.924325,7283.83745 286.155174,7282.79624 286.959165,7281.99226 C287.954203,7280.99968 289.239792,7280.51332 297.993144,7280.90837 C299.135448,7280.95998 300.179243,7281.19026 300.985224,7281.99226 C301.980262,7282.98483 302.473801,7284.28014 302.071806,7292.99991 C302.028024,7293.96767 301.865833,7294.49274 301.729513,7294.84312 C300.829003,7297.15085 298.757333,7297.47145 289.951245,7297.06748 M298.089663,7283.68956 C298.089663,7284.34665 298.623998,7284.88065 299.283709,7284.88065 C299.943419,7284.88065 300.47875,7284.34665 300.47875,7283.68956 C300.47875,7283.03248 299.943419,7282.49847 299.283709,7282.49847 C298.623998,7282.49847 298.089663,7283.03248 298.089663,7283.68956 M288.862673,7288.98792 C288.862673,7291.80286 291.150266,7294.08479 293.972194,7294.08479 C296.794123,7294.08479 299.081716,7291.80286 299.081716,7288.98792 C299.081716,7286.17298 296.794123,7283.89205 293.972194,7283.89205 C291.150266,7283.89205 288.862673,7286.17298 288.862673,7288.98792 M290.655732,7288.98792 C290.655732,7287.16159 292.140329,7285.67967 293.972194,7285.67967 C295.80406,7285.67967 297.288657,7287.16159 297.288657,7288.98792 C297.288657,7290.81525 295.80406,7292.29716 293.972194,7292.29716 C292.140329,7292.29716 290.655732,7290.81525 290.655732,7288.98792" id="instagram-[#167]">
          </path>
        </g>
      </g>
    </g>
  </g>
</svg>
`;

const ShareModal = ({ isProfile = false }: { isProfile?: boolean }) => {
  const { modalClose, modalKey, modalData } = useModalStore();
  const [mode, setMode] = useState("share");

  const [bgColor, setBgColor] = useState("bg-gradient-to-bl from-[#AF18A9] to-[#F4803F]");
  const [fgColor, setFgColor] = useState("#AF18A9");

  console.log(modalData);

  const hostClient =
    isProfile === false
      ? modalData.type === PostType.DEFAULT
        ? `${process.env.NEXT_PUBLIC_CLIENT_HOST}/p/${modalData?.id}?utm_source=og_web_button_share_sheet`
        : `${process.env.NEXT_PUBLIC_CLIENT_HOST}/r/${modalData?.id}?utm_source=og_web_button_share_sheet`
      : `${process.env.NEXT_PUBLIC_CLIENT_HOST}/${modalData?.username}?utm_source=og_web_button_share_sheet`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(hostClient);
    toast.success("Link copied to clipboard!");
    modalClose();
  };

  const handleCloseModal = () => {
    setMode("share");
    modalClose();
  };

  const downloadCode = () => {
    const canvas: any = document.getElementById("QR");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download =
        isProfile === false
          ? `${modalData.type === PostType.DEFAULT ? "Post" : "Reel"} shared on ${new Date(
              modalData.created_at
            ).toLocaleString("en-us", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })} _qr.png`
          : `${modalData?.username}_qr.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const renderShareOptions = () => (
    <div className="space-y-7 my-2">
      <FacebookShareButton
        url={hostClient}
        title={`See ${
          isProfile === false
            ? modalData.type === PostType.REEL
              ? `this Outstagram video by @${modalData.user.username}`
              : `this Outstagram image by @${modalData.user.username}`
            : `@${modalData.username}'s profile on Outstagram `
        } `}
        hashtag="Outstagram"
        className="flex items-center space-x-4 cursor-pointer hover:text-gray-400">
        <FacebookShareIcon />
        <div>Share to Facebook</div>
      </FacebookShareButton>

      <FacebookMessengerShareButton
        title={`See ${
          isProfile === false
            ? modalData.type === PostType.REEL
              ? `this Outstagram video by @${modalData.user.username}`
              : `this Outstagram image by @${modalData.user.username}`
            : `@${modalData.username}'s profile on Outstagram `
        } `}
        url={hostClient}
        appId="1217981644879628"
        className="flex items-center space-x-4 cursor-pointer hover:text-gray-400">
        <MessageFacebookShareIcon />
        <div>Share in Message</div>
      </FacebookMessengerShareButton>

      <TwitterShareButton
        url={hostClient}
        title={`See ${
          isProfile === false
            ? modalData.type === PostType.REEL
              ? `this Outstagram video by @${modalData.user.username}`
              : `this Outstagram image by @${modalData.user.username}`
            : `@${modalData.username}'s profile on Outstagram `
        } `}
        hashtags={[`Outstagram`]}
        className="flex items-center space-x-4 cursor-pointer hover:text-gray-400">
        <XShareIcon />
        <div>Share to Twitter</div>
      </TwitterShareButton>

      <TelegramShareButton
        url={hostClient}
        title={`See ${
          isProfile === false
            ? modalData.type === PostType.REEL
              ? `this Outstagram video by @${modalData.user.username}`
              : `this Outstagram image by @${modalData.user.username}`
            : `@${modalData.username}'s profile on Outstagram `
        } `}
        className="flex items-center space-x-4 cursor-pointer hover:text-gray-400">
        <LiaTelegramPlane size={27} />
        <div>Share in Telegram</div>
      </TelegramShareButton>

      <LinkedinShareButton
        url={hostClient}
        title={`See ${
          isProfile === false
            ? modalData.type === PostType.REEL
              ? `this Outstagram video by @${modalData.user.username}`
              : `this Outstagram image by @${modalData.user.username}`
            : `@${modalData.username}'s profile on Outstagram `
        } `}
        className="flex items-center space-x-4 cursor-pointer hover:text-gray-400">
        <LinkedinShareIcon />
        <div>Share to Linkedin</div>
      </LinkedinShareButton>
      {isProfile === false && (
        <div className="flex items-center space-x-4 cursor-pointer hover:text-gray-400">
          <PinterestShareButton url={hostClient} media={modalData?.post_files[0].url} description={modalData.caption}>
            <PinterestShareIcon />
          </PinterestShareButton>
          <div>Share to Pinterest</div>
        </div>
      )}

      <EmailShareButton
        url={hostClient}
        title={`See ${
          isProfile === false
            ? modalData.type === PostType.REEL
              ? `this Outstagram video by @${modalData.user.username}`
              : `this Outstagram image by @${modalData.user.username}`
            : `@${modalData.username}'s profile on Outstagram `
        } `}
        className="flex items-center space-x-4 cursor-pointer hover:text-gray-400">
        <EmailShareIcon />
        <div>Share via Email</div>
      </EmailShareButton>

      <div className="flex items-center space-x-4 cursor-pointer hover:text-gray-400" onClick={() => setMode("qr")}>
        <QRShareIcon />
        <div>QR code</div>
      </div>
      <div className="flex items-center space-x-4 cursor-pointer hover:text-gray-400" onClick={handleCopyLink}>
        <CPShareIcon />
        <div>Copy Link</div>
      </div>
      <div onClick={modalClose} className="text-[#00376b] mx-10 cursor-pointer hover:text-gray-400">
        Cancel
      </div>
    </div>
  );

  const renderQRCode = () => (
    <>
      <div className="flex flex-col items-center space-y-4 text-center mt-6 ">
        <div className="border-3 w-[335px] h-[295px] rounded-lg flex flex-col items-center space-y-2 py-3">
          <QRCode
            value={hostClient}
            size={190}
            qrStyle="dots"
            eyeRadius={10}
            enableCORS={true}
            ecLevel="H"
            logoImage={`data:image/svg+xml;utf8,${encodeURIComponent(svgLogo(fgColor))}`}
            logoHeight={57}
            logoWidth={57}
            fgColor={fgColor}
            id={"QR"}
          />

          <span className={`text-2xl font-semibold text-transparent bg-clip-text ${bgColor}`}>
            {isProfile === false ? (
              <>
                {modalData.type === PostType.DEFAULT ? "POST" : "REEL"} SHARED ON{" "}
                {new Date(modalData.created_at)
                  .toLocaleString("en-us", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })
                  .toUpperCase()}
                <br /> BY {modalData.user?.username?.toUpperCase()}
              </>
            ) : (
              modalData.username.toUpperCase()
            )}
          </span>
        </div>
        <div className="space-x-3">
          <button
            className="rounded-full border p-3 bg-black"
            onClick={() => {
              setBgColor("bg-black");
              setFgColor("#000000");
            }}
          />
          <button
            className="rounded-full border p-3 bg-gradient-to-bl from-[#187AD0] to-[#4BC9F8] focus:border-2 focus:border-black"
            onClick={() => {
              setBgColor("bg-gradient-to-bl from-[#187AD0] to-[#4BC9F8]");
              setFgColor("#187AD0");
            }}
          />
          <button
            className="rounded-full border p-3 bg-gradient-to-bl from-[#9917BF] to-[#30B7F1] focus:border-2 focus:border-black"
            onClick={() => {
              setBgColor("bg-gradient-to-bl from-[#9917BF] to-[#30B7F1]");
              setFgColor("#9917BF");
            }}
          />
          <button
            className="rounded-full border p-3 bg-gradient-to-bl from-[#2CC4E9] to-[#6AC15F] focus:border-2 focus:border-black"
            onClick={() => {
              setBgColor("bg-gradient-to-bl from-[#2CC4E9] to-[#6AC15F]");
              setFgColor("#2CC4E9");
            }}
          />
          <button
            className="rounded-full border p-3 bg-gradient-to-bl from-[#2D2D2D] to-[#6A6A6A] focus:border-2 focus:border-black"
            onClick={() => {
              setBgColor("bg-gradient-to-bl from-[#2D2D2D] to-[#6A6A6A]");
              setFgColor("#6A6A6A");
            }}
          />
          <button
            autoFocus={true}
            className="rounded-full border p-3 bg-gradient-to-bl from-[#AF18A9] to-[#F4803F] focus:border-2  focus:border-black"
            onClick={() => {
              setBgColor("bg-gradient-to-bl from-[#AF18A9] to-[#F4803F]");
              setFgColor("#AF18A9");
            }}
          />
        </div>
        <p className="text-sm text-[#737373] pt-3">
          People can scan this QR code with their smartphone&apos;s <br />
          camera to see this {isProfile === false ? (modalData.type === PostType.DEFAULT ? "post" : "reel") : "profile"}
          .
        </p>
      </div>
    </>
  );

  return (
    <Modal
      size="md"
      isOpen={modalKey === ShareModalKey}
      onOpenChange={handleCloseModal}
      hideCloseButton={mode === "share" ? false : true}
      backdrop="opaque"
      scrollBehavior="inside">
      <ModalContent className={`p-0 ${mode === "qr" ? "h-[550px] w-[400px]" : "h-[400px]"}`}>
        {(onClose) => (
          <>
            {mode === "share" && (
              <ModalHeader className="flex flex-col gap-1 font-semibold items-center text-base border-b py-3">
                Share to...
              </ModalHeader>
            )}

            <ModalBody className={`{${mode === "share" ? "my-3" : ""}}`}>
              {mode === "share" ? renderShareOptions() : renderQRCode()}
            </ModalBody>

            {mode === "qr" && (
              <ModalFooter className="flex flex-col items-center justify-center text-center cursor-pointer">
                <div
                  className="w-full font-bold text-sm text-[#0095F6] hover:text-gray-400 border-t pt-2"
                  onClick={() => downloadCode()}>
                  Download QR Code
                </div>
                <Divider />
                <div className="w-full text-sm hover:text-gray-400" onClick={() => setMode("share")}>
                  Done
                </div>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
