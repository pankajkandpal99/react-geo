# KML File Viewer

A React-based web application that allows users to upload KML files, view their contents on a map, and analyze the data with summary and detailed information.

![KML File Viewer Screenshot](screenshot.png) <!-- Add a screenshot if available -->

## Features

1. **Upload KML Files**:

   - Users can upload KML files using the file input.
   - The application validates the file type and ensures it is a valid KML file.

2. **Display on Map**:

   - The uploaded KML file is parsed and displayed on an interactive map using **Leaflet.js** and **OpenStreetMap**.

3. **Summary Information**:

   - Users can click the **Summary** button to view a count of different element types (e.g., Point, LineString, Polygon) in the KML file.

4. **Detailed Information**:

   - Users can click the **Detailed** button to view the type and length (for LineStrings and MultiLineStrings) of each element.

5. **Reset Functionality**:

   - The **Reset** button clears the uploaded file, removes the data from the map, and resets all displayed information.

6. **Error Handling**:

   - The application provides clear error messages for invalid file types, empty files, or parsing errors.

7. **User-Friendly UI**:
   - Buttons are disabled when not applicable (e.g., Summary and Detailed buttons are disabled until a file is uploaded).
   - Smooth transitions and hover effects enhance the user experience.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Leaflet.js**: A JavaScript library for interactive maps.
- **OpenStreetMap**: Free and open-source map data.
- **@tmcw/togeojson**: A library to convert KML files to GeoJSON format.
- **Tailwind CSS**: A utility-first CSS framework for styling.

## Setup and Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/kml-file-viewer.git
   cd kml-file-viewer
   ```

### How to Use:

1. Copy the above Markdown content.
2. Create a new file named `README.md` in your project's root directory.
3. Paste the copied content into the `README.md` file.
4. Save the file.

This `README.md` file is now ready to be used in your project. If you have a screenshot of your application, replace `screenshot.png` with the actual path to your screenshot file. Let me know if you need further assistance! 😊
