package com.manage.workflow.repository;

import com.manage.workflow.model.PasswordSalt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasswordSaltRepository extends JpaRepository<PasswordSalt,Long> {
    @Query(value = "SELECT p.passwordSalt from PasswordSalt p JOIN (SELECT a.id FROM Acount a WHERE a.username=:username) t ON p.idAccount = t.id",nativeQuery = true)
    Optional<String> getPasswordSaltByUsername(@Param("username") String username);
}
