import { useNavigation } from "react-router-dom";

const SubmitButton = ({ formBtn, caption = "Submit" }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      className={`btn btn-block ${formBtn && "form-btn"}`}
      disabled={isSubmitting}
    >
      {isSubmitting ? "submitting ..." : caption}
    </button>
  );
};
export default SubmitButton;
