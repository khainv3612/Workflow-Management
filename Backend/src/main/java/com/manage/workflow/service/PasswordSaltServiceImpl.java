package com.manage.workflow.service;

import com.manage.workflow.model.PasswordSalt;
import com.manage.workflow.repository.PasswordSaltRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class PasswordSaltServiceImpl implements IPasswordSaltService {
    @Autowired
    private PasswordSaltRepository repository;

    @Override
    public String getPasswordSaltByUsername(String username) {
        String passwordSalt = repository.getPasswordSaltByUsername(username).get();
        return null != passwordSalt ? passwordSalt : "";
    }

    @Override
    public PasswordSalt addNew(PasswordSalt passwordSalt) {

        return repository.save(passwordSalt);
    }
}
