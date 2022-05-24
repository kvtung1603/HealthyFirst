package com.uet.project.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Table(name = "authToken")
@AllArgsConstructor
@NoArgsConstructor
public class AuthToken implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "token")
    private String token;

    public AuthToken(String token) {
        this.token = token;
    }


}