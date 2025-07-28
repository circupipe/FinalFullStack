const formatValidationErrors = (zodError) => {
  const errors = [];

  if (zodError.errors) {
    zodError.errors.forEach((error) => {
      const field = error.path.join(".");
      errors.push(`${field}: ${error.message}`);
    });
  }

  return errors;
};

export const CreateResponse = (
  method,
  resource,
  data,
  validationErrors = null
) => {
  let response;
  let errors = [];

  switch (method) {
    case "POST":
      if (resource === "login") {
        if (validationErrors) {
          errors = formatValidationErrors(validationErrors);
          response = {
            code: 400,
            status: "Bad Request",
            error: errors,
            data: null,
          };
        } else if (!data) {
          errors.push(`No se puede ingresar ${resource}`);
          response = {
            code: 400,
            status: "Bad Request",
            error: errors,
            data: null,
          };
        } else {
          response = {
            code: 200,
            status: "OK",
            error: null,
            data: data,
          };
        }
      } else {
        if (validationErrors) {
          errors = formatValidationErrors(validationErrors);
          response = {
            code: 400,
            status: "Bad Request",
            error: errors,
            data: null,
          };
        } else if (!data) {
          errors.push(`No se puede ingresar ${resource}`);
          response = {
            code: 400,
            status: "Bad Request",
            error: errors,
            data: null,
          };
        } else {
          response = {
            code: 201,
            status: "Created",
            error: null,
            data: data,
          };
        }
      }
      break;
    case "GET":
      if (Array.isArray(data)) {
        if (!data || data.length <= 0) {
          errors.push(`No se encuentra ${resource}`);
          data = [];
        }
        response = {
          code: data.length > 0 ? 200 : 404,
          status: data.length > 0 ? "OK" : "Not Found",
          error: errors.length > 0 ? errors : null,
          data,
        };
      } else {
        if (!data) {
          errors.push(`No se encuentra ${resource}`);
        }
        response = {
          code: data ? 200 : 404,
          status: data ? "OK" : "Not Found",
          error: errors.length > 0 ? errors : null,
          data,
        };
      }
      break;

    case "PATCH":
      if (validationErrors) {
        errors = formatValidationErrors(validationErrors);
        response = {
          code: 400,
          status: "Bad Request",
          error: errors,
          data: null,
        };
      } else if (!data) {
        errors.push(`No se pudo actualizar el ${resource}`);
        response = {
          code: 304,
          status: "Not Modified",
          error: errors,
          data: null,
        };
      } else {
        response = {
          code: 200,
          status: "OK",
          error: null,
          data: data,
        };
      }
      break;

    case "PUT":
      if (validationErrors) {
        errors = formatValidationErrors(validationErrors);
        response = {
          code: 400,
          status: "Bad Request",
          error: errors,
          data: null,
        };
      } else if (!data) {
        errors.push(`No se pudo actualizar el ${resource}`);
        response = {
          code: 404,
          status: "Not Found",
          error: errors,
          data: null,
        };
      } else {
        response = {
          code: 200,
          status: "OK",
          error: null,
          data: data,
        };
      }
      break;

    case "DELETE":
      const deleted = data?.affectedRows || 0;

      if (deleted === 0) {
        errors.push(`No se pudo borrar ${resource}`);
      }

      response = {
        code: deleted > 0 ? 202 : 400,
        status: deleted > 0 ? "Accepted" : "Bad Request",
        error: errors.length > 0 ? errors : null,
        data,
      };
      break;
  }

  return response;
};
