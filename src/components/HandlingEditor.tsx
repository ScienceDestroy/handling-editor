import React, { useState, useMemo } from 'react';
import { HandlingData } from '../types';
import { FileText, Save, Plus, Trash2, Search } from 'lucide-react';

interface EditorProps {
  handlingData: HandlingData[];
  onSave: (data: HandlingData[]) => void;
}

export const HandlingEditor: React.FC<EditorProps> = ({ handlingData, onSave }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [editedData, setEditedData] = useState<HandlingData[]>(handlingData);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVehicles = useMemo(() => {
    return editedData.filter(vehicle =>
      vehicle.handlingName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [editedData, searchQuery]);

  const handleValueChange = (field: keyof HandlingData, value: any) => {
    const newData = [...editedData];
    if (typeof value === 'object') {
      newData[selectedIndex][field] = { ...newData[selectedIndex][field], ...value };
    } else {
      newData[selectedIndex][field] = { value };
    }
    setEditedData(newData);
  };

  const handleVectorChange = (field: string, axis: 'x' | 'y' | 'z', value: string) => {
    const newData = [...editedData];
    newData[selectedIndex][field][axis] = value;
    setEditedData(newData);
  };

  const addNewVehicle = () => {
    const newVehicle = { ...editedData[0] };
    newVehicle.handlingName = 'new_vehicle';
    setEditedData([newVehicle, ...editedData]);
    setSelectedIndex(0);
  };

  const deleteVehicle = (index: number) => {
    const newData = editedData.filter((_, i) => i !== index);
    setEditedData(newData);
    if (selectedIndex >= newData.length) {
      setSelectedIndex(Math.max(0, newData.length - 1));
    }
  };

  const renderNumberInput = (label: string, field: keyof HandlingData) => (
    <label className="block">
      <span className="text-gray-700">{label}</span>
      <input
        type="number"
        step="0.001"
        value={editedData[selectedIndex][field].value}
        onChange={(e) => handleValueChange(field, e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
      />
    </label>
  );

  const renderVectorInput = (label: string, field: keyof HandlingData) => (
    <div>
      <span className="text-gray-700">{label}</span>
      <div className="grid grid-cols-3 gap-2 mt-1">
        <input
          type="number"
          step="0.001"
          value={editedData[selectedIndex][field].x}
          onChange={(e) => handleVectorChange(field, 'x', e.target.value)}
          placeholder="X"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
        />
        <input
          type="number"
          step="0.001"
          value={editedData[selectedIndex][field].y}
          onChange={(e) => handleVectorChange(field, 'y', e.target.value)}
          placeholder="Y"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
        />
        <input
          type="number"
          step="0.001"
          value={editedData[selectedIndex][field].z}
          onChange={(e) => handleVectorChange(field, 'z', e.target.value)}
          placeholder="Z"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
        />
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-72 bg-gray-900 flex flex-col h-full">
        <div className="p-4 border-b border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-white text-xl font-bold">Vehicles</h2>
            <button
              onClick={addNewVehicle}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors duration-200"
              title="Add new vehicle"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vehicles..."
              className="w-full bg-gray-800 text-gray-200 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-700 transition-all duration-200"
            />
            <Search 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="space-y-0.5">
            {filteredVehicles.map((vehicle, index) => {
              const originalIndex = editedData.indexOf(vehicle);
              return (
                <div
                  key={originalIndex}
                  className={`
                    group relative flex items-center w-full cursor-pointer
                    transition-all duration-200 ease-in-out
                    ${selectedIndex === originalIndex
                      ? 'bg-blue-600' 
                      : 'hover:bg-gray-800'
                    }
                  `}
                  onClick={() => setSelectedIndex(originalIndex)}
                >
                  <div className="flex-1 flex items-center py-3 px-4 min-w-0">
                    <FileText 
                      size={18} 
                      className={`mr-3 flex-shrink-0 ${
                        selectedIndex === originalIndex ? 'text-white' : 'text-gray-400'
                      }`} 
                    />
                    <span 
                      className={`truncate font-medium ${
                        selectedIndex === originalIndex ? 'text-white' : 'text-gray-300'
                      }`}
                    >
                      {vehicle.handlingName}
                    </span>
                  </div>
                  {editedData.length > 1 && (
                    <div className="pr-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteVehicle(originalIndex);
                        }}
                        className={`
                          p-1.5 rounded-md opacity-0 group-hover:opacity-100
                          transition-all duration-200
                          ${selectedIndex === originalIndex
                            ? 'text-white hover:bg-blue-700' 
                            : 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                          }
                        `}
                        title="Delete vehicle"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-auto bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Editing: {editedData[selectedIndex]?.handlingName}
          </h1>
          <button
            onClick={() => onSave(editedData)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Save size={20} className="mr-2" />
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Basic Properties */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Basic Properties</h3>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Handling Name</span>
                <input
                  type="text"
                  value={editedData[selectedIndex].handlingName}
                  onChange={(e) => handleValueChange('handlingName', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </label>
              {renderNumberInput('Mass', 'fMass')}
              {renderNumberInput('Initial Drag Coefficient', 'fInitialDragCoeff')}
              {renderNumberInput('Percent Submerged', 'fPercentSubmerged')}
            </div>
          </div>

          {/* Vector Properties */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Vector Properties</h3>
            <div className="space-y-4">
              {renderVectorInput('Centre of Mass Offset', 'vecCentreOfMassOffset')}
              {renderVectorInput('Inertia Multiplier', 'vecInertiaMultiplier')}
            </div>
          </div>

          {/* Drive Properties */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Drive Properties</h3>
            <div className="space-y-4">
              {renderNumberInput('Drive Bias Front', 'fDriveBiasFront')}
              {renderNumberInput('Initial Drive Gears', 'nInitialDriveGears')}
              {renderNumberInput('Initial Drive Force', 'fInitialDriveForce')}
              {renderNumberInput('Drive Inertia', 'fDriveInertia')}
              {renderNumberInput('Clutch Change Rate Scale Up Shift', 'fClutchChangeRateScaleUpShift')}
              {renderNumberInput('Clutch Change Rate Scale Down Shift', 'fClutchChangeRateScaleDownShift')}
              {renderNumberInput('Initial Drive Max Flat Velocity', 'fInitialDriveMaxFlatVel')}
            </div>
          </div>

          {/* Brake Properties */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Brake Properties</h3>
            <div className="space-y-4">
              {renderNumberInput('Brake Force', 'fBrakeForce')}
              {renderNumberInput('Brake Bias Front', 'fBrakeBiasFront')}
              {renderNumberInput('Hand Brake Force', 'fHandBrakeForce')}
            </div>
          </div>

          {/* Steering & Traction */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Steering & Traction</h3>
            <div className="space-y-4">
              {renderNumberInput('Steering Lock', 'fSteeringLock')}
              {renderNumberInput('Traction Curve Max', 'fTractionCurveMax')}
              {renderNumberInput('Traction Curve Min', 'fTractionCurveMin')}
              {renderNumberInput('Traction Curve Lateral', 'fTractionCurveLateral')}
              {renderNumberInput('Traction Spring Delta Max', 'fTractionSpringDeltaMax')}
              {renderNumberInput('Low Speed Traction Loss Mult', 'fLowSpeedTractionLossMult')}
              {renderNumberInput('Camber Stiffness', 'fCamberStiffnesss')}
              {renderNumberInput('Traction Bias Front', 'fTractionBiasFront')}
              {renderNumberInput('Traction Loss Mult', 'fTractionLossMult')}
            </div>
          </div>

          {/* Suspension */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Suspension</h3>
            <div className="space-y-4">
              {renderNumberInput('Suspension Force', 'fSuspensionForce')}
              {renderNumberInput('Suspension Comp Damp', 'fSuspensionCompDamp')}
              {renderNumberInput('Suspension Rebound Damp', 'fSuspensionReboundDamp')}
              {renderNumberInput('Suspension Upper Limit', 'fSuspensionUpperLimit')}
              {renderNumberInput('Suspension Lower Limit', 'fSuspensionLowerLimit')}
              {renderNumberInput('Suspension Raise', 'fSuspensionRaise')}
              {renderNumberInput('Suspension Bias Front', 'fSuspensionBiasFront')}
            </div>
          </div>

          {/* Roll & Damage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Roll & Damage</h3>
            <div className="space-y-4">
              {renderNumberInput('Anti Roll Bar Force', 'fAntiRollBarForce')}
              {renderNumberInput('Anti Roll Bar Bias Front', 'fAntiRollBarBiasFront')}
              {renderNumberInput('Roll Centre Height Front', 'fRollCentreHeightFront')}
              {renderNumberInput('Roll Centre Height Rear', 'fRollCentreHeightRear')}
              {renderNumberInput('Collision Damage Mult', 'fCollisionDamageMult')}
              {renderNumberInput('Weapon Damage Mult', 'fWeaponDamageMult')}
              {renderNumberInput('Deformation Damage Mult', 'fDeformationDamageMult')}
              {renderNumberInput('Engine Damage Mult', 'fEngineDamageMult')}
            </div>
          </div>

          {/* Misc Properties */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Misc Properties</h3>
            <div className="space-y-4">
              {renderNumberInput('Petrol Tank Volume', 'fPetrolTankVolume')}
              {renderNumberInput('Oil Volume', 'fOilVolume')}
              {renderNumberInput('Seat Offset Dist X', 'fSeatOffsetDistX')}
              {renderNumberInput('Seat Offset Dist Y', 'fSeatOffsetDistY')}
              {renderNumberInput('Seat Offset Dist Z', 'fSeatOffsetDistZ')}
              {renderNumberInput('Monetary Value', 'nMonetaryValue')}
              <label className="block">
                <span className="text-gray-700">Model Flags</span>
                <input
                  type="text"
                  value={editedData[selectedIndex].strModelFlags}
                  onChange={(e) => handleValueChange('strModelFlags', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Handling Flags</span>
                <input
                  type="text"
                  value={editedData[selectedIndex].strHandlingFlags}
                  onChange={(e) => handleValueChange('strHandlingFlags', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Damage Flags</span>
                <input
                  type="text"
                  value={editedData[selectedIndex].strDamageFlags}
                  onChange={(e) => handleValueChange('strDamageFlags', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">AI Handling</span>
                <input
                  type="text"
                  value={editedData[selectedIndex].AIHandling}
                  onChange={(e) => handleValueChange('AIHandling', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};