import * as toGeoJSON from "@tmcw/togeojson";

export const parseKML = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result) {
        reject("Failed to read the file.");
        return;
      }
      const parser = new DOMParser();
      try {
        const kml = parser.parseFromString(
          e.target.result as string,
          "text/xml"
        );
        const converted = toGeoJSON.kml(kml);
        if (!converted.features || converted.features.length === 0) {
          reject("The KML file is empty or invalid.");
          return;
        }
        resolve(converted);
      } catch (err) {
        reject("Failed to parse the KML file.");
      }
    };
    reader.onerror = () => {
      reject("Failed to read the file.");
    };
    reader.readAsText(file);
  });
};
