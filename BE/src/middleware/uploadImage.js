import cloudinary from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/errorHandling.js";

export const uploadImage = (model, isArray = false) => {
  return asyncHandler(async (req, res, next) => {
    const modelName = model.modelName.toLowerCase();
    if (req.file || req.files?.length) {
      if (isArray) {
        const images = [];

        for (const image of req.files) {
          // upload images to cloud service
          const { public_id, secure_url } = await cloudinary.uploader.upload(
            image.path,
            {
              folder: `web-project-ecommerce/${modelName}/${req[modelName]._id}`,
            }
          );

          images.push({
            public_id,
            secure_url,
          });
        }
        req[modelName].images = images;
      } else {
        const { public_id, secure_url } = await cloudinary.uploader.upload(
          req.file.path,
          {
            folder: `web-project-ecommerce/${modelName}/${req[modelName]._id}`,
          }
        );

        req[modelName].image = {
          public_id,
          secure_url,
        };
      }
      // save image paths to DB
      await req[modelName].save();
    }

    return res.status(200).json({ message: "Done", model: req[modelName] });
  });
};

export const updateImage = (model, isArray = false) => {
  return asyncHandler(async (req, res, next) => {
    // check if file is send
    if (!(req.file || req.files?.length)) return next();

    const modelName = model.modelName.toLowerCase();
    const modelData = req[modelName];

    // check if it one file or more
    if (isArray) {
      // delete the pervious images
      if (modelData.images.length) {
        await cloudinary.api.delete_resources_by_prefix(
          `web-project-ecommerce/${modelName}/${modelData._id}`
        );
      }

      const images = [];

      // upload new imgs
      for (const image of req.files) {
        const { public_id, secure_url } = await cloudinary.uploader.upload(
          image.path,
          {
            folder: `web-project-ecommerce/${modelName}/${modelData._id}`,
          }
        );

        images.push({ public_id, secure_url });
      }

      req.body.images = images;
    } else {
      //delete pervious img
      if (modelData.image)
        await cloudinary.uploader.destroy(modelData.image.public_id);

      // upload new img
      const { public_id, secure_url } = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: `web-project-ecommerce/${modelName}/${modelData._id}`,
        }
      );

      req.body.image = { public_id, secure_url };
    }
    return next();
  });
};

export const deleteImage = (model, isArray = false) => {
  return asyncHandler(async (req, res, next) => {
    const modelName = model.modelName.toLowerCase();
    const modelData = req[modelName];

    // if the model doesn't have image
    if (!(modelData.image || modelData.images)) return next();

    if (isArray) {
      await cloudinary.api.delete_resources_by_prefix(
        `web-project-ecommerce/${modelName}/${modelData._id}`
      );
      modelData.images = [];
      await modelData.save();
    } else {
      await cloudinary.uploader.destroy(modelData.image.public_id);
      await modelData.updateOne({
        $unset: { image: "" },
      });
    }

    return next();
  });
};
