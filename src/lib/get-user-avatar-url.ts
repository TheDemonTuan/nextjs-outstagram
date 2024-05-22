export const getUserAvatarURL = (url: string | undefined) => {
  return url ? url : "/guest-avatar.png";
};
