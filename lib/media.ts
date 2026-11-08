/** Each video has a still frame next to it: foo.desktop.mp4 → foo.desktop.jpg */
export const posterOf = (src: string) => src.replace(/\.mp4$/, ".jpg");
