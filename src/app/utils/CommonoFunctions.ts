import Swal from 'sweetalert2';
import { LiveUserDTO } from '../dtos/LiveUserDTO';

export const errorMessage = (message: string) => {
  if (message) {
    return Swal.fire({
      icon: 'error',
      text: message,
    });
  } else {
    return Swal.fire({
      icon: 'error',
      text: 'Something Went Wrong, Please Contact admin!',
    });
  }
};

export const successMessage = (message: string) => {
  return Swal.fire({
    icon: 'success',
    text: message,
  });
};

export const getLiveUserData = (): LiveUserDTO => {
  try {
    const encodedUserdata = localStorage.getItem('userData');
    if (!encodedUserdata) {
      return {
        userId: '',
        username: '',
        userAvatar: '',
        userEmail: '',
      };
    }
    return JSON.parse(window.atob(encodedUserdata));
  } catch (error) {
    return {
      userId: '',
      username: '',
      userAvatar: '',
      userEmail: '',
    };
  }
};
