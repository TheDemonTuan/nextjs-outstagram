export const getUserAvatarURL = (url: string | undefined | null) => {
  return url ? url : "/guest-avatar.webp";
};
