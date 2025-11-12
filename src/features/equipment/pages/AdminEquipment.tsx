import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Trash2, Package, Upload, Image as ImageIcon, X } from 'lucide-react';
import { getEquipmentApi, createEquipmentApi, deleteEquipmentApi, updateEquipmentApi, uploadEquipmentImageApi } from '../../../services/equipmentApis';
import { EquipmentCondition } from '../types/equipment.types';
import LoadingSpinner from '../../../commonComponents/loading-spinner/LoadingSpinner';
import Modal from '../../../commonComponents/modals/Modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../commonComponents/forms/Input';
import { Select } from '../../../commonComponents/forms/Select';
import Button from '../../../commonComponents/buttons/Button';
import { formatDate } from '../../../utils/dateUtils';

const equipmentSchema = z.object({
  name: z.string().min(1, 'Equipment name is required'),
  condition: z.enum(['New', 'Good', 'In Maintenance'], {
    required_error: 'Condition is required',
  }),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
  image: z.instanceof(File).optional(),
});

type EquipmentFormData = z.infer<typeof equipmentSchema>;

const AdminEquipment = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingConditionId, setEditingConditionId] = useState<string | null>(null);
  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['equipment'],
    queryFn: getEquipmentApi,
  });

  const createMutation = useMutation({
    mutationFn: createEquipmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      setIsAddModalOpen(false);
      reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { condition: EquipmentCondition } }) =>
      updateEquipmentApi(id, data),
    onSuccess: (_response, variables) => {
      // Optimistically update the cache
      queryClient.setQueryData(['equipment'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((eq: any) =>
            eq.id === variables.id ? { ...eq, condition: variables.data.condition } : eq
          ),
        };
      });
      setEditingConditionId(null);
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: ({ id, file }: { id: string; file: File }) => uploadEquipmentImageApi(id, file),
    onSuccess: (response, variables) => {
      // Optimistically update the cache with the new image
      queryClient.setQueryData(['equipment'], (old: any) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((eq: any) =>
            eq.id === variables.id ? { ...eq, image: response.data.image } : eq
          ),
        };
      });
      setUploadingImageId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEquipmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['equipment'] });
      setDeleteId(null);
    },
  });

  const equipmentList = data?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
  });

  const imageFile = watch('image');

  const onSubmit = async (formData: EquipmentFormData) => {
    const { image, ...equipmentData } = formData;
    const result = await createMutation.mutateAsync(equipmentData);
    
    // If image is provided, upload it after creating equipment
    if (image && result.data) {
      await uploadImageMutation.mutateAsync({ id: result.data.id, file: image });
    }
  };

  const handleConditionChange = (id: string, condition: EquipmentCondition) => {
    updateMutation.mutate({ id, data: { condition } });
  };

  const handleImageUpload = (id: string, file: File) => {
    setUploadingImageId(id);
    uploadImageMutation.mutate({ id, file });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const getConditionBadgeColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'bg-green-100 text-green-700';
      case 'Good':
        return 'bg-blue-100 text-blue-700';
      case 'In Maintenance':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading equipment..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Equipment Management</h1>
              <p className="text-gray-600 mt-1">Manage gym equipment inventory and maintenance status.</p>
            </div>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Equipment
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium mb-2">Total Equipment</p>
          <p className="text-3xl font-bold text-gray-800">{equipmentList.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium mb-2">In Good Condition</p>
          <p className="text-3xl font-bold text-blue-600">
            {equipmentList.filter((eq) => eq.condition === 'Good' || eq.condition === 'New').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <p className="text-sm text-gray-600 font-medium mb-2">In Maintenance</p>
          <p className="text-3xl font-bold text-amber-600">
            {equipmentList.filter((eq) => eq.condition === 'In Maintenance').length}
          </p>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Equipment List</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage all gym equipment.</p>
        </div>

        {equipmentList.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No equipment found. Add your first piece of equipment to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Condition
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purchase Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {equipmentList.map((equipment) => (
                  <tr 
                    key={equipment.id} 
                    className="group relative transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-blue-500/10 hover:via-purple-500/5 hover:to-blue-500/10 hover:backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/20 border-l-4 border-l-transparent hover:border-l-blue-400 hover:ring-1 hover:ring-blue-400/30"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {equipment.image ? (
                          <label className="relative group/image cursor-pointer block">
                            <div className="relative overflow-visible">
                              <img
                                src={equipment.image}
                                alt={equipment.name}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-200 transition-all duration-300 ease-in-out group-hover/image:scale-125 group-hover/image:shadow-xl group-hover/image:border-blue-400 group-hover/image:border-2"
                              />
                              <button
                                type="button"
                                className="absolute -top-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1.5 shadow-lg opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-20 flex items-center justify-center"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const input = document.getElementById(`image-upload-${equipment.id}`) as HTMLInputElement;
                                  input?.click();
                                }}
                                title="Change image"
                              >
                                <Upload className="w-3 h-3" />
                              </button>
                            </div>
                            <input
                              id={`image-upload-${equipment.id}`}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(equipment.id, file);
                                }
                              }}
                              disabled={uploadingImageId === equipment.id}
                            />
                          </label>
                        ) : (
                          <label className="relative w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all duration-300 group/placeholder hover:scale-110 hover:shadow-lg hover:bg-blue-50/30">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  handleImageUpload(equipment.id, file);
                                }
                              }}
                              disabled={uploadingImageId === equipment.id}
                            />
                            {uploadingImageId === equipment.id ? (
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            ) : (
                              <ImageIcon className="w-6 h-6 text-gray-400 group-hover/placeholder:text-blue-500 transition-colors duration-300" />
                            )}
                          </label>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{equipment.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingConditionId === equipment.id ? (
                        <select
                          value={equipment.condition}
                          onChange={(e) => {
                            handleConditionChange(equipment.id, e.target.value as EquipmentCondition);
                          }}
                          onBlur={() => setEditingConditionId(null)}
                          autoFocus
                          className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs font-semibold"
                          style={{
                            backgroundColor: getConditionBadgeColor(equipment.condition).includes('green')
                              ? '#dcfce7'
                              : getConditionBadgeColor(equipment.condition).includes('blue')
                              ? '#dbeafe'
                              : '#fef3c7',
                            color: getConditionBadgeColor(equipment.condition).includes('green')
                              ? '#15803d'
                              : getConditionBadgeColor(equipment.condition).includes('blue')
                              ? '#1e40af'
                              : '#b45309',
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Good">Good</option>
                          <option value="In Maintenance">In Maintenance</option>
                        </select>
                      ) : (
                        <span
                          onClick={() => setEditingConditionId(equipment.id)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity ${getConditionBadgeColor(
                            equipment.condition
                          )}`}
                        >
                          {equipment.condition}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(equipment.purchaseDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setDeleteId(equipment.id)}
                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Equipment Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          reset();
        }}
        title="Add New Equipment"
        size="md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Equipment Name"
            placeholder="e.g., Treadmill Pro 3000"
            {...register('name')}
            error={errors.name?.message}
          />

          <Select
            label="Condition"
            {...register('condition')}
            error={errors.condition?.message}
            options={[
              { value: '', label: 'Select condition' },
              { value: 'New', label: 'New' },
              { value: 'Good', label: 'Good' },
              { value: 'In Maintenance', label: 'In Maintenance' },
            ]}
          />

          <Input
            label="Purchase Date"
            type="date"
            {...register('purchaseDate')}
            error={errors.purchaseDate?.message}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Image (Optional)
            </label>
            <div className="mt-1 flex items-center gap-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register('image')}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue('image', file);
                    }
                  }}
                />
              </label>
              {imageFile && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setValue('image', undefined)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsAddModalOpen(false);
                reset();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={createMutation.isPending}
              className="flex-1"
            >
              Add Equipment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete Equipment"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete this equipment? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteId(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteId && handleDelete(deleteId)}
              isLoading={deleteMutation.isPending}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminEquipment;

