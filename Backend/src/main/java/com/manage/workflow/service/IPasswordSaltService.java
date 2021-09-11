package com.manage.workflow.service;

import com.manage.workflow.model.PasswordSalt;
import com.manage.workflow.repository.PasswordSaltRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("passwordSaltService")
public interface IPasswordSaltService {
   String getPasswordSaltByUsername(String username);
   PasswordSalt addNew(PasswordSalt passwordSalt);
}
