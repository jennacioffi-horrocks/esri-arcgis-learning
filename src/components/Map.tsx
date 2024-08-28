import React, { useEffect, MouseEvent } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';

import Widget from './Widget';

const MapComponent: React.FC = () => {
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked');
  }

  useEffect(() => {
    // Create a new Map instance with a Basemap
    const map = new Map({
      basemap: 'streets' 
    });

    // Define symbols for the breaks
    const sym1 = {
      type: "simple-line",
      color: "red",
      width: "2px",
    };

    const sym2 = {
      type: "simple-line",
      color: "yellow",
      width: "2px",
    };

    const sym3 = {
      type: "simple-line",
      color: "orange",
      width: "2px",
    };

    const sym4 = {
      type: "simple-line",
      color: "green",
      width: "2px",
    };

    const sym5 = {
      type: "simple-line",
      color: "blue",
      width: "2px",
    };

    const classBreakInfos = [
      {
        label: '1-2 (Poor)',
        maxValue: 2.99,
        minValue: 1.0,
        symbol: sym1, 
      },
      {
        label: '3-4 (Fair)',
        maxValue: 4.99,
        minValue: 3.0,
        symbol: sym2,  
      },
      {
        label: '5-6 (Good)',
        maxValue: 6.99,
        minValue: 5.0,
        symbol: sym3, 
      },
      {
        label: '7-8 (Very Good)',
        maxValue: 8.99,
        minValue: 7.0,
        symbol: sym4, 
      },
      {
        label: '9-10 (Excellent)',
        maxValue: 10.0,
        minValue: 9.0,
        symbol: sym5,  
      }
    ]

    // Create a ClassBreaksRenderer instance
    const renderer = new ClassBreaksRenderer({
      field: 'CURRENT_PASER',  
      classBreakInfos: classBreakInfos,
      defaultSymbol: sym1,
    });

    // Create a FeatureLayer instance
    const featureLayer = new FeatureLayer({
      url: 'https://gis.horrocks.com/arcgis/rest/services/PavementDemo_MIL1/FeatureServer/0', // URL to your FeatureLayer
      renderer: renderer, // Apply the renderer to the layer
    });

    // Create a MapView instance
    const view = new MapView({
      container: 'mapViewDiv', // ID of the div element
      map: map,
      center: [-111.576820, 40.136589], // Longitude, latitude
      zoom: 13, // Zoom level
    });

    // Add the FeatureLayer to the Map
    view.map.add(featureLayer);

    // Cleanup on component unmount
    return () => {
      view.destroy();
    };
  }, []);

  return (
    <div id="mapViewDiv" style={{ height: '100vh', width: '100vw'}}>
      <Widget onClick={handleOnClick} />
    </div>
  );
};

export default MapComponent;
