"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { branchSchema, BranchFormValues } from "@/lib/branch-schema";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Branch, FulfillmentMethod } from "@/types/branch";

interface BranchFormProps {
  initialData?: Branch | null;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 24.7136,
  lng: 46.6753,
};

const BranchForm = ({ initialData, onSave, onCancel }: BranchFormProps) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      name: initialData?.name || "فرع الرياض",
      nameAr: initialData?.nameAr || "Riyadh Branch",
      city: initialData?.city || "Riyadh",
      phoneNumber: initialData?.phoneNumber || "+966501111111",
      isActive: initialData?.isActive ?? true,
      openingTime: initialData?.openingTime || "09:00",
      closingTime: initialData?.closingTime || "23:00",
      address: {
        latitude: initialData?.address?.latitude || 24.7136,
        longitude: initialData?.address?.longitude || 46.6753,
        country: initialData?.address?.country || "Saudi Arabia",
        region: initialData?.address?.region || "",
        governorate: initialData?.address?.governorate || "",
        city: initialData?.address?.city || initialData?.city || "Riyadh",
        district: initialData?.address?.district || "",
        street: initialData?.address?.street || "Olaya Street",
        buildingNumber: initialData?.address?.buildingNumber || "101",
        floor: initialData?.address?.floor || "",
        apartment: initialData?.address?.apartment || "",
        landmark: initialData?.address?.landmark || "",
        notes: initialData?.address?.notes || "",
      },
      fulfillmentMethods:
        (initialData?.fulfillmentMethods as FulfillmentMethod[]) || ["PICKUP"],
    },
  });

  const isActive = watch("isActive");
  const lat = watch("address.latitude");
  const lng = watch("address.longitude");

  const onSubmit = (data: BranchFormValues) => {
    const payload = {
      name: data.name,
      nameAr: data.nameAr,
      city: data.city,
      phoneNumber: data.phoneNumber || "+966500000000",
      isActive: data.isActive,
      openingTime: data.openingTime,
      closingTime: data.closingTime,
      address: {
        latitude: data.address.latitude,
        longitude: data.address.longitude,
        country: data.address.country || "Saudi Arabia",
        region: data.address.region || "",
        governorate: data.address.governorate || "",
        city: data.address.city || data.city,
        district: data.address.district || "",
        street: data.address.street || "",
        buildingNumber: data.address.buildingNumber || "",
        floor: data.address.floor || "",
        apartment: data.address.apartment || "",
        landmark: data.address.landmark || "",
        notes: data.address.notes || "",
      },
      fulfillmentMethod:
        data.fulfillmentMethods && data.fulfillmentMethods.length > 0
          ? data.fulfillmentMethods[0]
          : "PICKUP",
    };
    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
            اسم الفرع (عربي)
          </label>
          <Input
            {...register("name")}
            placeholder="مثال: فرع الرياض"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
            اسم الفرع (إنجليزي)
          </label>
          <Input {...register("nameAr")} placeholder="Example: Riyadh Branch" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
          المدينة
        </label>
        <Input
          {...register("city")}
          placeholder="مثال: الرياض"
          className={errors.city ? "border-red-500" : ""}
        />
        {errors.city && (
          <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
          رقم الهاتف
        </label>
        <Input {...register("phoneNumber")} placeholder="+966501111111" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
            وقت الفتح
          </label>
          <Input
            type="time"
            {...register("openingTime")}
            className={errors.openingTime ? "border-red-500" : ""}
          />
          {errors.openingTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.openingTime.message}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
            وقت الإغلاق
          </label>
          <Input
            type="time"
            {...register("closingTime")}
            className={errors.closingTime ? "border-red-500" : ""}
          />
          {errors.closingTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.closingTime.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="block text-sm font-medium text-[#1C1C1C]">
          الحالة
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setValue("isActive", true)}
            className={`px-4 py-1 rounded-full text-sm transition-colors ${isActive ? "bg-[#DCFCE7] text-[#1E8E3E]" : "bg-[#F3F3F3] text-[#666666]"}`}
          >
            مفتوح
          </button>
          <button
            type="button"
            onClick={() => setValue("isActive", false)}
            className={`px-4 py-1 rounded-full text-sm transition-colors ${!isActive ? "bg-[#FEE2E2] text-[#DD404B]" : "bg-[#F3F3F3] text-[#666666]"}`}
          >
            مغلق
          </button>
        </div>
      </div>

      <div className="pt-4 border-t border-[#F3F3F3]">
        <h3 className="text-sm font-bold text-[#1C1C1C] mb-4">
          العنوان والإحداثيات
        </h3>

        {/* ✅ Google Maps Component */}
        {isLoaded ? (
          <div className="mb-4 rounded-lg overflow-hidden border border-[#F3F3F3]">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{
                lat: lat || defaultCenter.lat,
                lng: lng || defaultCenter.lng,
              }}
              zoom={12}
              onClick={(e) => {
                const lat = e.latLng?.lat();
                const lng = e.latLng?.lng();
                if (lat && lng) {
                  setValue("address.latitude", lat);
                  setValue("address.longitude", lng);
                }
              }}
            >
              <Marker
                position={{
                  lat: lat || defaultCenter.lat,
                  lng: lng || defaultCenter.lng,
                }}
              />
            </GoogleMap>
          </div>
        ) : (
          <div className="text-center py-4 text-[#A1A1A1]">
            جاري تحميل الخريطة...
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
              خط العرض (Latitude)
            </label>
            <Input
              type="number"
              step="any"
              {...register("address.latitude", { valueAsNumber: true })}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1C1C1C] mb-1">
              خط الطول (Longitude)
            </label>
            <Input
              type="number"
              step="any"
              {...register("address.longitude", { valueAsNumber: true })}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>
    </form>
  );
};

export default BranchForm;
