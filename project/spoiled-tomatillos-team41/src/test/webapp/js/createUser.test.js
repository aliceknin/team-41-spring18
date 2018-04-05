import {CreateUser} from '../../../main/webapp/js/components/createUser';
import React from 'react';
import { shallow } from 'enzyme';

test('set username works', () => {
  const setUsername = {
    target : {
      value : 'testUser'
    }
  }

  const createUserForm = shallow(<CreateUser />);

  expect(createUserForm.state('username')).toEqual('');

  createUserForm.find('#username').simulate('change', setUsername);

  expect(createUserForm.state('username')).toEqual('testUser');

});

test('set password works', () => {

  const setPassword = {
    target : {
      value : 'testPassword'
    }
  }

  const createUserForm = shallow(<CreateUser />);

  expect(createUserForm.state('password')).toEqual('');

  createUserForm.find('#pwd').simulate('change', setPassword);

  expect(createUserForm.state('password')).toEqual('testPassword');

});

test('set fullname works', () => {

  const setFullname = {
    target : {
      value : 'testFullname'
    }
  }

  const createUserForm = shallow(<CreateUser />);

  expect(createUserForm.state('fullname')).toEqual('');

  createUserForm.find('#fullname').simulate('change', setFullname);

  expect(createUserForm.state('fullname')).toEqual('testFullname');

});

test('set email works', () => {

  const setEmail = {
    target : {
      value : 'testEmail'
    }
  }

  const createUserForm = shallow(<CreateUser />);

  expect(createUserForm.state('email')).toEqual('');

  createUserForm.find('#email').simulate('change', setEmail);

  expect(createUserForm.state('email')).toEqual('testEmail');

});
