import ProfileForm from './ProfileForm';
import PasswordForm from './PasswordForm';

const Edit = () => {
  return (
    <div className="profile-container">
      <div className="edit-profile">
        <ProfileForm />
        <hr />
        <PasswordForm />
      </div>
    </div>
  );
};

export default Edit;
