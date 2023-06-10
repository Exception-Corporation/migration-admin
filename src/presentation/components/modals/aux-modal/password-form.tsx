const PasswordForm = ({ formik }: { formik: any }) => {
  return (
    <>
      {/* PASSWORD */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>

        <input
          className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password Usuario"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
      </div>

      {formik.touched.password && formik.errors.password ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Error</p>
          <p>{formik.errors.password}</p>
        </div>
      ) : null}
      {/* CONFIRM-PASSWORD */}
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirmar password
        </label>

        <input
          className="modal-input shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="confirmPassword"
          type="password"
          placeholder="Password de confirmación Usuario"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
      </div>
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Error</p>
          <p>{formik.errors.confirmPassword}</p>
        </div>
      ) : null}
    </>
  );
};

export default PasswordForm;
