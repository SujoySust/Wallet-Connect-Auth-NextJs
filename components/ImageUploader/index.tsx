import classes from "./ImageUploader.module.css";
import { FiPlus, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import {
  ALLOWED_FILE_EXTENSIONS,
  ALLOWED_FILE_TYPES,
} from "src/helpers/corearray";
import { ImageItem } from "components/Images";
import { MAX_IMAGE_SIZE_IN_MB } from "src/helpers/coreconstants";
import useTranslation from "next-translate/useTranslation";

export const ImageUploader = ({
  label,
  title,
  subtitle,
  selectedFile,
  previewItem,
  onChange,
  setUploadedImgError,
  onClear,
  required,
  editable = true,
  getError,
  maxSize = MAX_IMAGE_SIZE_IN_MB,
  supportedTypes = ALLOWED_FILE_TYPES.image,
  supportedExtensions = ALLOWED_FILE_EXTENSIONS.image,
}: any) => {
  const { t } = useTranslation("common");
  // const t = (s: string) => s;

  const [imgErr, setImgErr] = useState<any>(false);

  useEffect(() => {
    // file type not matched
    // file exts not matched
    // size exceeds
    // ok

    if (selectedFile) {
      let name = selectedFile.name.split(".");
      let ext = name[name.length - 1];

      if (
        !supportedTypes.includes(selectedFile.type) ||
        !supportedExtensions.includes(ext)
      ) {
        setImgErr(t("File type not matched!"));
        setUploadedImgError(true);
      }

      if (selectedFile.size > maxSize * 1000000) {
        setImgErr(t("File size exceeded!"));
        setUploadedImgError(true);
      } else {
        setImgErr(false);
        setUploadedImgError(false);
      }
    }
  }, [selectedFile]);

  return (
    <div className={classes.inputImageCard}>
      <div className={classes.inputImageCardWrap}>
        <div className={classes.inputImage}>
          {editable ? (
            <label
              htmlFor={label}
              className={`${classes.inputFileContainer} ${
                previewItem ? classes.shortWidth : classes.fullWidth
              }`}
            >
              <FiPlus aria-label="Add Image" />

              <input
                type="file"
                id={label}
                name={label}
                //@ts-ignore
                accept={[
                  ...supportedTypes,
                  ...supportedExtensions.map((el: string) => "." + el),
                ]}
                onChange={onChange}
              />
            </label>
          ) : null}

          {/* {previewItem && (
            <button
              type="button"
              className={classes.clearPreview}
              onClick={onClear}
            >
              <FiX aria-label="remove image" />
            </button>
          )} */}

          {previewItem && (
            <ImageItem
              src={previewItem || "/assets/images/star.svg"}
              alt="uploaded image"
              isNextImage = {false}
            />
          )}
        </div>

        <h3 className={classes.inputImageCardTitle}>
          {title}
          {required && <sup className="text-danger">*</sup>}
        </h3>

        <p
          className={`${classes.inputImageCardSubTitle} ${
            imgErr ? "text-danger" : ""
          }`}
        >
          {subtitle}

          <span className="d-block mt-2">
            {t("File types supported")}:{" "}
            {supportedExtensions.map((el: string) => "." + el).join(", ")}
          </span>

          {imgErr && <span className="d-block mt-2">{imgErr}</span>}

          <span className="d-block mt-2">
            {t("Max Size")}: {maxSize} {t("MB")}
          </span>
        </p>
      </div>
    </div>
  );
};
