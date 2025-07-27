import React from "react";

const RawMaterialsTable = ({ materials }) => {
  if (!Array.isArray(materials) || materials.length === 0) {
    return (
      <div className="mt-6 text-gray-600 text-center">
        No raw materials uploaded yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Unit</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Uploaded</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((item, index) => (
            <tr key={item.raw_material_id} className="text-sm border-t">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.raw_material_quantity}</td>
              <td className="px-4 py-2">{item.unit}</td>
              <td className="px-4 py-2">₹{item.raw_material_price}</td>
              <td className="px-4 py-2">
                <img
                  src={`https://tk-backend-n9dr.onrender.com/${item.image}`}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">
                {new Date(item.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RawMaterialsTable;
