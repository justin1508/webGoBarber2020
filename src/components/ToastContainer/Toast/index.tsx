import React, { useEffect } from "react";
import {
  FiAlertCircle,
  FiXCircle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import { Container } from "./styles";
import { ToastMessage, useToast } from "../../../hooks/toast";

interface ToastProps {
  message: ToastMessage;
  // style: Record<string, unknown>;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  sucess: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);
  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
    >
      {icons[message.type || "info"]}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};
export default Toast;
