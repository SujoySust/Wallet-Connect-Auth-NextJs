import { DummyButton } from "components/DummyButtons";
import classes from "./WarningModal.module.css";

const WarningModal = ({ setShow, onSubmit, submitting, description }: any) => {
  return (
    <div className="modalContainerWrap">
      <div className="text-center">
        <p>{description}</p>
      </div>
      <hr />

      <div className={`${classes.topSection} pt-4 pb-2`}>
        {!submitting && (
          <button type="button" onClick={() => setShow(false)}>
            Never mind
          </button>
        )}

        {!submitting ? (
          <button type="button" className={classes.btnsolid} onClick={onSubmit}>
            Proceed
          </button>
        ) : (
          <DummyButton />
        )}
      </div>
    </div>
  );
};

export default WarningModal;
//lang ok
