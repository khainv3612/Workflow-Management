package com.manage.workflow.dto;

import com.manage.workflow.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {
    private Long id;

    private String avatar;

    private String username;

    private String email;

    private String password;

    private Set<Role> roles;
}
