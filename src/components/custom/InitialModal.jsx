import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function InitialModal() {
  const form = useForm({
    defaultValues: {
      name: "",
      imageIcon: "",
    },
    mode: "onSubmit", // Validate only on submit
  });
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <Dialog open>
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
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 px-4 rounded-full bg-gray-600 flex items-center justify-center text-gray-400">
                  TODO: Icon
                </div>
                <div className="flex-1">
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
                        <FormLabel
                          htmlFor="name"
                          className="uppercase text-xs font-bold text-gray-400"
                        >
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
                          <FormMessage className="text-red-500 text-sm mt-1">
                            {fieldState.error.message}
                          </FormMessage>
                        )}
                      </FormItem>
                    )}
                  ></FormField>
                </div>
              </div>
            </div>
            <DialogFooter className="bg-[#202225] border-t border-gray-700 px-6 py-4 mt-4">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
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
