const bulkAction = async (action, values, errorHandler) =>
  Promise.all(
    values.map(async (value) => {
      try {
        await action(value);
        return value;
      } catch (err) {
        if (errorHandler) return errorHandler(err);
        return Promise.reject(err);
      }
    })
  );

export default bulkAction;
