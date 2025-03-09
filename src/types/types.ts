import { GeoJsonObject } from "geojson";

export interface Feature {
  geometry: {
    type: string;
    coordinates: any[];
  };
}
export interface GeoJSONData extends GeoJsonObject {
  type:
    | "Point"
    | "MultiPoint"
    | "LineString"
    | "MultiLineString"
    | "Polygon"
    | "MultiPolygon"
    | "GeometryCollection"
    | "Feature"
    | "FeatureCollection";
  features: Feature[];
}

export interface Summary {
  [key: string]: number;
}

export interface DetailedInfo {
  type: string;
  length: number;
}
export interface GeoJSONData extends GeoJsonObject {
  features: Feature[];
}

export interface DetailedInfo {
  type: string;
  length: number;
}
