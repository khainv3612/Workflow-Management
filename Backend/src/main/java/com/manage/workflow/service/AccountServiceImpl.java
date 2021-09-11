package com.manage.workflow.service;

import com.manage.workflow.dto.AccountDTO;
import com.manage.workflow.model.Account;
import com.manage.workflow.repository.AccountRepository;
import com.manage.workflow.security.service.UserDetailsImpl;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class AccountServiceImpl implements IAccountService {

    @Autowired
    private ModelMapper modelMapper;
    @Value("${passwordSalt.length}")
    int length;
    @Value("${passwordSalt.hasLetter}")
    boolean hasLetter;
    @Value("${passwordSalt.hasNumber}")
    boolean hasNumber;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private IPasswordSaltService passwordSaltService;

    @Autowired
    private AccountRepository repository;

    @Override
    public String generatePassWordSalt() {
        String generatedString = RandomStringUtils.random(length, hasLetter, hasNumber);
        return generatedString;
    }

    @Override
    @Transactional
    public String getPasswordsaltByUsername(String username) {
        try {
            String passwordSalt = (String) passwordSaltService.getPasswordSaltByUsername(username);
            return null != passwordSalt ? passwordSalt : "";
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }

    @Override
    public AccountDTO toDto(Account account) {
        return modelMapper.map(account, AccountDTO.class);
    }

    @Override
    public List<AccountDTO> getAll() {
        List<Account> list = repository.findAll();
        return convertBosToDtos(list);
    }

    private List<AccountDTO> convertBosToDtos(List<Account> bos) {
        List<AccountDTO> result = new ArrayList<>();
        if (null != bos && !bos.isEmpty()) {
            result = Arrays.asList(modelMapper.map(bos, AccountDTO[].class));

        }
        return result;
    }

    @Override
    public List<AccountDTO> findAllByUsernameContaining(String username, Pageable pageable) {
        List<Account> list = repository.findAllByUsernameContaining(username.trim(), pageable);
        List<AccountDTO> result = new ArrayList<>();
        if (null != list && !list.isEmpty()) {
            AccountDTO dto = new AccountDTO();
            for (Account bo : list) {
                if (bo.getId().equals(getCurrentUser().getId())) {
                    continue;
                }
                dto.setId(bo.getId());
                dto.setUsername(bo.getUsername());
                dto.setAvatar(bo.getAvatar());
                result.add(dto);
                dto = new AccountDTO();
            }
        }
        return result;
    }

    @Override
    public List<AccountDTO> findAll(Pageable pageable) {
        List<Account> list = repository.findAllByUsernameContaining("", pageable);
        return convertBosToDtos(list);
    }

    @Override
    public AccountDTO getCurrentUser() {
        UserDetailsImpl userPrincipal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        AccountDTO dto = new AccountDTO();
        dto.setId(userPrincipal.getId());
        dto.setUsername(userPrincipal.getUsername());
        return dto;
    }
}
