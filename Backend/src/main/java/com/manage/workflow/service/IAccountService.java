package com.manage.workflow.service;

import com.manage.workflow.dto.AccountDTO;
import com.manage.workflow.model.Account;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("accountService")
public interface IAccountService {
    String generatePassWordSalt();

    String getPasswordsaltByUsername(String username);

    AccountDTO toDto(Account account);

    List<AccountDTO> getAll();

    List<AccountDTO> findAllByUsernameContaining(String username, Pageable pageable);

    List<AccountDTO> findAll(Pageable pageable);

    AccountDTO getCurrentUser();
}
