const ShowMessage = (props) => {
  return (
    <div className='text-center text-black'>
      <div className={`p-5 rounded-md ${props.showMessage.className}`}>
        {props.showMessage.message}
      </div>
    </div>
  );
};

export default ShowMessage;
