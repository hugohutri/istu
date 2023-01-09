import domtoimage from 'dom-to-image-more';
import format from 'date-fns/format';

const getFileName = (fileType: string) => {
  `${format(new Date(), "'Seats-'HH-mm-ss")}.${fileType}`;
};

export const exportPNG = (node: HTMLElement) => {
  domtoimage.toPng(node).then(function (dataUrl: string) {
    const link = document.createElement('a');
    link.download = `${getFileName('png')}`;
    link.href = dataUrl;
    link.click();
  });
};
