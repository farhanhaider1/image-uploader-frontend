import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import styled from "styled-components";

const DismissBtn = styled.button`
  margin-left: 10px;
  padding: 5px;
  background-color: #f3f4f6;
  border: gray solid 1px;
  border-radius: 5px;
`;

const Toast = ({ text, type, error }) => {
  useEffect(() => {
    if (!type) {
      toast(text);
    }
    if (type === "success") {
      toast.success(text);
    }
    if (type === "error") {
      toast.error((t) => (
        <span>
          {text}
          <DismissBtn onClick={() => toast.dismiss(t.id)}>Dismiss</DismissBtn>
        </span>
      ));
    }
  }, [error]);
  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "",
          style: {
            marginTop: "9vh",
            background: "#363636",
            color: "#fff",
            zIndex: 1,
          },
          duration: 20000,
        }}
      />
    </div>
  );
};

export default Toast;
