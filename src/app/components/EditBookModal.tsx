import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Save } from "lucide-react";

const EditBookModal = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-[#D9E2D8] px-3 py-2 text-sm font-medium text-[#174D38] transition-colors hover:bg-[#E6EFE7] cursor-pointer"
            >
              <Pencil size={15} />
              Edit
            </button>
          }
        />

        <DialogContent className="max-h-[90vh] overflow-y-auto border-[#E5E7DF] bg-white text-[#20392C] sm:max-w-xl">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl font-bold text-[#20392C] pt-2">
              Edit Book Details
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-[#68746B]">
              Update your book information below. Your existing details are
              shown so you can make the necessary changes.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="gap-4">
            <Field>
              <Label htmlFor="edit-title">Book Title</Label>
              <Input
                id="edit-title"
                name="title"
                defaultValue="The Great Gatsby"
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field>
                <Label htmlFor="edit-author">Author Name</Label>
                <Input
                  id="edit-author"
                  name="author"
                  defaultValue="F. Scott Fitzgerald"
                />
              </Field>

              <Field>
                <Label htmlFor="edit-category">Category</Label>
                <select
                  id="edit-category"
                  name="category"
                  defaultValue="Fiction"
                  className="h-10 w-full rounded-md border border-input bg-transparent px-3 text-sm outline-none focus:border-[#174D38]"
                >
                  <option value="Fiction">Fiction</option>
                  <option value="Science">Science</option>
                  <option value="History">History</option>
                  <option value="Kids">Kids</option>
                  <option value="Others">Others</option>
                </select>
              </Field>
            </div>

            <Field>
              <Label htmlFor="edit-copies">Total Copies</Label>
              <Input
                id="edit-copies"
                name="totalCopies"
                type="number"
                min="1"
                defaultValue="5"
              />
            </Field>

            <Field>
              <Label htmlFor="edit-image">Book Cover Image URL</Label>
              <Input
                id="edit-image"
                name="image"
                type="url"
                defaultValue="https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg"
              />
              <p className="text-xs leading-5 text-[#68746B]">
                Replace the current image URL if you want to use a different
                cover.
              </p>
            </Field>

            <Field>
              <Label htmlFor="edit-description">Book Description</Label>
              <textarea
                id="edit-description"
                name="description"
                defaultValue="A classic novel exploring wealth, ambition, love, and the American Dream during the Jazz Age."
                rows={4}
                className="w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm leading-6 outline-none focus:border-[#174D38]"
              />
            </Field>
          </FieldGroup>

          <DialogFooter className="gap-2 border-t border-[#E5E7DF] pt-4">
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="cursor-pointer border-[#D9E2D8]"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              type="submit"
              className="cursor-pointer bg-[#174D38] text-white hover:bg-[#103B2B]"
            >
              <Save size={16} />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditBookModal;
