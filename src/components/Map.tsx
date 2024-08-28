import React, { useEffect, useState } from 'react';
import '@arcgis/core/assets/esri/themes/light/main.css';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import ClassBreaksRenderer from '@arcgis/core/renderers/ClassBreaksRenderer';

import Widget from './Widget';

const MapComponent: React.FC = () => {
  const [minValue, setMinValue] = useState<number | undefined>(1);
  const [maxValue, setMaxValue] = useState<number | undefined>(10);
  const [featureLayer, setFeatureLayer] = useState<FeatureLayer | null>(null);

  const classBreakInfos = [
    {
      label: '1-2 (Poor)',
      maxValue: 2.99,
      minValue: 1.0,
      symbol: {
        type: 'simple-line',
        color: 'red',
        width: '2px',
      },
    },
    {
      label: '3-4 (Fair)',
      maxValue: 4.99,
      minValue: 3.0,
      symbol: {
        type: 'simple-line',
        color: 'yellow',
        width: '2px',
      },
    },
    {
      label: '5-6 (Good)',
      maxValue: 6.99,
      minValue: 5.0,
      symbol: {
        type: 'simple-line',
        color: 'orange',
        width: '2px',
      },
    },
    {
      label: '7-8 (Very Good)',
      maxValue: 8.99,
      minValue: 7.0,
      symbol: {
        type: 'simple-line',
        color: 'green',
        width: '2px',
      },
    },
    {
      label: '9-10 (Excellent)',
      maxValue: 10.0,
      minValue: 9.0,
      symbol: {
        type: 'simple-line',
        color: 'blue',
        width: '2px',
      },
    }
  ];

  const applyRenderer = () => {
    if (featureLayer) {
      console.log('Applying renderer with minValue:', minValue, 'and maxValue:', maxValue);

      const updatedClassBreakInfos = classBreakInfos.filter(info => 
        (minValue === undefined || info.maxValue >= minValue) && 
        (maxValue === undefined || info.minValue <= maxValue)
      );

      const updatedRenderer = new ClassBreaksRenderer({
        field: 'CURRENT_PASER',
        classBreakInfos: updatedClassBreakInfos,
        defaultSymbol: {
          type: 'simple-line',
          color: 'gray',
          width: '2px',
        },
      });

      featureLayer.renderer = updatedRenderer;
      console.log('Renderer applied:', updatedRenderer);
    }
  };

  useEffect(() => {
    const map = new Map({
      basemap: 'streets'
    });

    const initialRenderer = new ClassBreaksRenderer({
      field: 'CURRENT_PASER',
      classBreakInfos: classBreakInfos,
      defaultSymbol: {
        type: 'simple-line',
        color: 'gray',
        width: '2px',
      },
    });

    const layer = new FeatureLayer({
      url: 'https://gis.horrocks.com/arcgis/rest/services/PavementDemo_MIL1/FeatureServer/0',
      renderer: initialRenderer,
    });

    setFeatureLayer(layer);

    const view = new MapView({
      container: 'mapViewDiv',
      map: map,
      center: [-111.576820, 40.136589],
      zoom: 14,
    });

    map.add(layer);

    // Cleanup on component unmount
    return () => {
      view.destroy();
    };
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div id="mapViewDiv" style={{ height: '100vh', width: '100vw' }}>
      <Widget
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
        onClick={() => applyRenderer()} // Apply renderer when button is clicked
      />
    </div>
  );
};

export default MapComponent;
