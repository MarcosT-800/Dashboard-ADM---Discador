import React from 'react';

const RouteList = ({ routes }) => {
  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h2 className="text-xl font-semibold mb-2">Lista de Rotas</h2>
      <div className="grid grid-cols-1 gap-4">
        {routes.map(route => (
          <div key={route.id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{route.name}</h3>
            <p className="text-gray-700">Endpoint: {route.endpoint}</p>
            <p className="text-gray-700">Route: {route.route}</p>
            <p className="text-gray-700">Uses Country Code: {route.uses_country_code ? 'Yes' : 'No'}</p>
            <p className="text-gray-700">Allow Mobile: {route.allow_mobile ? 'Yes' : 'No'}</p>
            <p className="text-gray-700">Allow Landline: {route.allow_landline ? 'Yes' : 'No'}</p>
            <h4 className="text-md font-semibold mt-2">Telephony Rates:</h4>
            {route['telephony-rates'].map(rate => (
              <div key={rate.id} className="bg-white p-2 rounded mt-1">
                <p className="text-gray-700">Minimum Duration: {rate.minimum_duration}</p>
                <p className="text-gray-700">Minimum Duration Charged: {rate.minimum_duration_charged}</p>
                <p className="text-gray-700">Cadence: {rate.cadence}</p>
                <p className="text-gray-700">Type: {rate.type}</p>
                <p className="text-gray-700">Value: {rate.value}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteList;
