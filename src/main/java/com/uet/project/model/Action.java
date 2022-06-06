//package com.uet.project.model;
//
//
//import com.uet.project.entity.User;
//import lombok.EqualsAndHashCode;
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.util.Date;
//import java.util.Set;
//
//@Entity
//@Table(name="action")
//@Setter
//@Getter
//@EqualsAndHashCode
//public class Action {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name="certificate_id", nullable = false)
//    private int action_id;
//
//    @Column(name="start_date", nullable = false)
//    private Date startDate;
//
//    @Column(name="end_date", nullable = false)
//    private Date endDate;
//
//    @Column(name="result")
//    private boolean result;
//
//    @OneToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name="store_id")
//    private Store store;
//
//    // manytoone vs user,
//    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinColumn(name="user_id")
//    private User user;
//
//
//    //certificate
//    @OneToOne(mappedBy = "actionEachCerti")
//    private Certificate certificate;
//
//    //
//    @OneToMany(mappedBy = "doAction")
//    private Set<Assessment> assessments;
//
//}
