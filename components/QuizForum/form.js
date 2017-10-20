import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './styles.css';
const SimpleForm = props => {
  const { handleSubmit, user, close, data, formData } = props;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        handleSubmit(
          {
            auth0_id: user.auth0_id,
            post_subject: formData.simple.values.post_subject,
            post_content: formData.simple.values.post_content
          },
          close
        );
      }}
      className={s['post-form']}
    >
      <div>
        <label>Post a question about Q{data.trial_index}</label>
      </div>
      <div>
        <label>Subject</label>
        <div>
          <Field
            name="post_subject"
            component="input"
            type="text"
            placeholder="enter a subject"
          />
        </div>
      </div>
      <div>
        <label>Content</label>
        <div>
          <Field name="post_content" component="textarea" />
        </div>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'simple' // a unique identifier for this form
})(SimpleForm);
