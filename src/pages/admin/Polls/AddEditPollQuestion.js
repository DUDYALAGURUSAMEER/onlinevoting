import React from "react";
import { Form, Modal, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { addQuestionToPoll } from "../../../apicalls/polls";
import { HideLoading, ShowLoading } from "../../../redux/spinnerSlice";
import { useDispatch } from "react-redux";
function AddEditPollQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  pollId
}) {
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState([{ option: "", votes: 0 }]);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {

      dispatch(ShowLoading());
      const requiredPayload = {
        question: values.name,
         options,
        pollId,
      };
      

      const response = await addQuestionToPoll(requiredPayload);
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const handleAddingOptionField = () => {
    setOptions([...options, { option: "", votes: 0 }]);
  };
  const handleRemovingOptionField = (e, i) => {
    const deleteVal = [...options];
    if (deleteVal.length > 1) {
      deleteVal.splice(i, 1);
      setOptions(deleteVal);
    }
  };
  const handleAddingOption = (e, i) => {
    // if(e.target.value !== null){
    const option = e.target.value;
    console.log(option);
    const votes = 0;
    const onchangeVal = [...options];
    // onchangeVal[i]={option: option, votes: votes}
    if (option === "") onchangeVal[i] = { option: "", votes: votes };
    else if (!onchangeVal.some((obj) => obj.option === option)) {
      // if(option !== ""){
      onchangeVal[i] = { option: option, votes: votes };
      // }
      // setOptions(onchangeVal);
    }
    setOptions(onchangeVal);
    // }
  };
  return (
    <Modal
      title="Add Poll"
      open={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false);
      }}
    >
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item name="name" label="Question">
          <input type="text" />
        </Form.Item>
        {/* <FormItem name = "option" label = "Add Options">
              <button type="button" class="primary-outlined-btn m-3" onClick={handleAddingOptionField}> + </button>
              {
                  options.map((val,i)=>
                  <div style={{display: 'flex'}}>
                        <input type="text" id="option" class="form-control" placeholder='Add Option' value={val.option} onChange={(e) => handleAddingOption(e, i)} required/>
                        <button type="button" class="primary-outlined-btn " onClick={(e) => handleRemovingOptionField(e, i)}> - </button>
                    </div>
                  )
              }
              
            </FormItem> */}
        <div class="col mb-3" layout = "vertical" > 
          <label for="option" class="form-label fw-bold">
            Add Options:{" "}
          </label>
          <button
            type="button"
            class="btn btn-sm btn-outline-dark m-3 btn-1"
            onClick={handleAddingOptionField}
          >
            {" "}
            +{" "}
          </button>
          {options.map((val, i) => (
            <div key={`${val}${i}`} style={{ display: "flex" }}>
              <input
                type="text"
                id="option"
                class="form-control"
                placeholder="Add Option"
                value={val.option}
                onChange={(e) => handleAddingOption(e, i)}
                required
              />
              <button
                type="button"
                class="btn btn-sm btn-outline-dark ml-1 btn-1"
                onClick={(e) => handleRemovingOptionField(e, i)}
              >
                {" "}
                -{" "}
              </button>
            </div>
          ))}
          <div className="flex justify-end mt-2 gap-3">
            <button
              className="primary-outlined-btn"
              type="button"
              onClick={() => setShowAddEditQuestionModal(false)}
            >
              Cancel
            </button>
            <button className="primary-contained-btn">Save</button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}

export default AddEditPollQuestion;
