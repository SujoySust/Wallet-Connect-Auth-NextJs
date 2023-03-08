import classes from "./ListGroup.module.css";

export const ListGroup = ({ hr, children }: any) => {
  return (
    <div
      className={`list-group ${hr ? "list-group-horizontal" : ""} ${
        classes.listGroup
      } `}
    >
      {children}
    </div>
  );
};
//lang ok
