import { Icon } from "@iconify/react/dist/iconify.js";

import {
  CheckOrdinalContentType,
  copyTextToClipboard,
  generateOrdinalContentLink,
  generateOrdinalShareLink,
} from "@/utilities";
import AppIframe from "@/components/AppIframe";
import { SpecificInscriptionResponse } from "@/types/api/ordinals.types";
import { useQuery } from "@tanstack/react-query";
import { handleApiErrors } from "@/utilities/handleErrors";
import { ordinalBaseApi } from "@/api/base.api";

const OrdinalCard = ({
  ordinal,
}: {
  ordinal: SpecificInscriptionResponse;
}): JSX.Element => {
  const text = generateOrdinalShareLink(ordinal.id?.toString());

  const contentType = CheckOrdinalContentType({
    content_type: ordinal.content_type,
    mime_type: ordinal.mime_type,
  });

  const { data: content } = useQuery({
    queryKey: ["getOrdinalContent", ordinal.id],
    queryFn: async () => {
      if (
        contentType === "Text" ||
        contentType === "JSON" ||
        contentType === "Unknown"
      ) {
        const response = await ordinalBaseApi.get(`/${ordinal?.id}`);
        if (response.ok) {
          return response?.data;
        } else {
          handleApiErrors(response);
          return null;
        }
      } else {
        return null;
      }
    },
    enabled:
      contentType === "Text" ||
      contentType === "JSON" ||
      contentType === "Unknown",
  });

  const formatUnkonwnContent = (value: unknown) => {
    if (typeof value === "string") return value;
    return JSON.stringify(value);
  };

  return (
    <div className="relative ">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-appDarkBlue600 text-sm  text-white">
        <div className="custom-break-words flex min-h-32 flex-1 items-center justify-center overflow-auto rounded-b-xl bg-appBlue160   text-center">
          {contentType === "HTML" ? (
            <div className="max-h-56">
              <AppIframe src={generateOrdinalContentLink(ordinal.id)} />
            </div>
          ) : contentType === "Image" ? (
            <div className="max-h-56">
              <img
                draggable={false}
                src={generateOrdinalContentLink(ordinal.id)}
                className="w-full"
              />
            </div>
          ) : contentType === "Text" ? (
            <div className="max-h-56">
              <p className="whitespace-pre-wrap px-2 py-6">
                {content as string}
              </p>
            </div>
          ) : (
            <div className="max-h-56">
              <p className="custom-break-words !line-clamp-[8] whitespace-pre-wrap px-2 py-6">
                {formatUnkonwnContent(content)}
              </p>
            </div>
          )}
        </div>
        <footer className="flex items-center justify-between  px-2 py-2">
          <p className="block truncate pr-2">{text}</p>

          <button
            type="button"
            onClick={() =>
              copyTextToClipboard({
                successText: "Link successfully copied to clipboard.",
                text: "https://" + text,
                errorText: "Unable to copy link to clipboard ",
              })
            }
            className="transition-all duration-300 hover:scale-110 hover:text-appYellow100 active:scale-95"
          >
            <Icon icon="solar:copy-line-duotone" className="text-xl" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default OrdinalCard;