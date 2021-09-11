package com.manage.workflow.config;

import com.manage.workflow.service.IPasswordSaltService;
import com.manage.workflow.service.PasswordSaltServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ConfigResource {
    @Bean
    public ModelMapper modelMapper() {
        return new ModelMapper();
    }

    @Bean
    public IPasswordSaltService passwordSaltService(){
        return new PasswordSaltServiceImpl();
    }
}
