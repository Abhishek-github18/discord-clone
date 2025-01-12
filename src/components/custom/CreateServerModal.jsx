import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageDropZone } from "./ImageDropZone";
import { useAuth } from "@clerk/clerk-react";
import propValidation from "prop-types";
import { getServers } from "../../hooks/utils/getServers";
import {useDispatch, useSelector} from 'react-redux'
import { setServer } from "../../utils/redux/slices/serverSlice";

export default function CreateServerModal({ onClose, openModal }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const form = useForm({
    defaultValues: {
      name: "",
    },
    mode: "onSubmit",
  });

  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state?.user?.user);


  const isLoading = form.formState.isSubmitting;

  const { getToken } = useAuth();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      imageIcon: uploadedImage,
    };

    try {
      const token = await getToken();

      const response = await fetch("http://localhost:3000/api/servers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Server created successfully:", result);
        onClose(); // Close the modal after successful creation

        const servers = await getServers(userProfile?.id); // Reuse the utility function
        dispatch(setServer(servers)); // Update Redux state
      } else {
        console.error("Error creating server:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogContent className="bg-[#2f3136] text-white rounded-md shadow-lg p-6 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Customize Your Server
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400">
            Give your server a name and an icon. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <ImageDropZone onUploadComplete={setUploadedImage} />

              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: "Server name is required",
                  minLength: {
                    value: 3,
                    message: "Server name must be at least 3 characters",
                  },
                }}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="uppercase text-xs font-bold text-gray-400">
                      Server Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        {...field}
                        id="name"
                        className={`bg-[#202225] text-white border ${
                          fieldState.error ? "border-red-500" : "border-gray-700"
                        } focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-gray-500`}
                        placeholder="Enter server name"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <p className="text-red-500 text-sm mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-[#202225] border-t border-gray-700 px-6 py-4 mt-4">
              <Button
                type="submit"
                disabled={isLoading || !uploadedImage}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 px-4 rounded"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

CreateServerModal.propTypes = {
  onClose: propValidation.func.isRequired,
  openModal: propValidation.bool.isRequired,
};