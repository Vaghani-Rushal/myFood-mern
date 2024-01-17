import ReactDom from "react-dom";
import { Link } from "react-router-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "55%",
  left: "50%",
  backgroundColor: "rgb(34,34,34)",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  height: "80%",
  width: "85%",
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};

export default function CartModal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div className="" style={MODAL_STYLES}>
        <Link
          className="text-white-50 fs-4 text-decoration-none px-3 py-2"
          style={{ marginLeft: "96%" }}
          onClick={onClose}
        >
          X
        </Link>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
