const Form = (props) => {
  const onSubmitHandler = (event) => {
    props.onSubmit(event);
  };

  return (
    <form className={props.className} id={props.id} onSubmit={onSubmitHandler}>
      {props.children}
    </form>
  );
};

export default Form;
