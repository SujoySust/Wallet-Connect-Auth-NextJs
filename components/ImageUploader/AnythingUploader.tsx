import classes from "./ImageUploader.module.css";
import { FiPlus } from "react-icons/fi";
import { MAX_ITEM_FILE_SIZE_IN_MB } from "src/helpers/coreconstants";
import {
  ACCEPTED_ASSET_EXTENSIONS_ALL,
  ACCEPTED_ASSET_TYPES_ALL,
  ALLOWED_FILE_EXTENSIONS,
} from "src/helpers/corearray";
import useTranslation from "next-translate/useTranslation";

export const AnythingUploader = ({
  previewItem,
  onChange,
  error,
  mediaType,
  editable = true,
  onClick,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  let prevArr = !editable && previewItem && previewItem.split(".");
  let previewType = "";
  if (prevArr?.length > 1) {
    previewType = prevArr[prevArr.length - 1];
  } else {
    prevArr;
  }

  return (
    <div className={classes.inputImageCard}>
      <div className={classes.inputImageCardWrap}>
        <div className={classes.inputImage}>
          {editable ? (
            <label
              htmlFor="asset-media"
              className={`${classes.inputFileContainer} ${
                previewItem ? classes.shortWidth : classes.fullWidth
              }`}
              onClick={onClick}
            >
              <FiPlus aria-label="Add Asset" />

              <input
                type="file"
                id="asset-media"
                name="asset-media"
                //@ts-ignore
                accept={[
                  ...ACCEPTED_ASSET_TYPES_ALL,
                  ...ACCEPTED_ASSET_EXTENSIONS_ALL.map((el) => "." + el),
                ]}
                onChange={onChange}
              />
            </label>
          ) : null}

          {previewItem &&
          ALLOWED_FILE_EXTENSIONS.video.includes(mediaType || previewType) ? (
            <video controls>
              <source src={previewItem} />
            </video>
          ) : ALLOWED_FILE_EXTENSIONS.audio.includes(
              mediaType || previewType
            ) ? (
            <div
              style={{ height: "100%", display: "grid", placeItems: "center" }}
            >
              <audio controls>
                <source src={previewItem} />
              </audio>
            </div>
          ) : ALLOWED_FILE_EXTENSIONS._3d.includes(mediaType || previewType) ? (
            <div
              style={{
                height: "100%",
                display: "grid",
                placeItems: "center",
              }}
            >
              {t("3D Model Uploaded")}
            </div>
          ) : ALLOWED_FILE_EXTENSIONS.image.includes(
              mediaType || previewType
            ) ? (
            <img src={previewItem} alt="uploaded image" />
          ) : null}
        </div>

        <h3 className={classes.inputImageCardTitle}>
          {t("Image, Video, Audio, or 3D Model")}
          <sup className="text-danger"> *</sup>
        </h3>
        <p
          className={`${classes.inputImageCardSubTitle} ${
            error ? "text-danger" : ""
          }`}
        >
          {t("File types supported")}:{" "}
          {ACCEPTED_ASSET_EXTENSIONS_ALL.map((el) => "." + el).join(", ")}
          <span className="text-center mt-3 d-block">
            {t("Max size")} : {MAX_ITEM_FILE_SIZE_IN_MB} {t("MB")}
          </span>
          {error && <span className="text-center mt-3 d-block">{error}</span>}
        </p>
      </div>
    </div>
  );
};
