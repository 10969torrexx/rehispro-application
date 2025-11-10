import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function DownloadImages({ images, document }) {
  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const folder = zip.folder(`${document}`);

    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split("/").pop();
      folder.file(fileName, blob);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, `${document}.zip`);
  };

  return (
    <div className="w-full justify-end p-2 mb-2">
      <button
        onClick={handleDownloadAll}
        className="btn-primary text-white hover:text-white px-4 py-2 rounded-full shadow-lg"
      >
        <i className="bi bi-cloud-arrow-down mr-2"></i> Download All Images
      </button>
    </div>
  );
}
