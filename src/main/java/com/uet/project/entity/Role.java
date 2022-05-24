package com.uet.project.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "role")
@Setter
@Getter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    public Role(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
