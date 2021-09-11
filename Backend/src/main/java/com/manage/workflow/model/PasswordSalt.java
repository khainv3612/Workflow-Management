package com.manage.workflow.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "PasswordSalt")
@Data
@AllArgsConstructor
@NoArgsConstructor
@NamedQueries({
})
public class PasswordSalt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long idAccount;

    @NotBlank
    private String passwordSalt;

    public PasswordSalt(@NotNull Long idAccount, @NotBlank String passwordSalt) {
        this.idAccount = idAccount;
        this.passwordSalt = passwordSalt;
    }
}
