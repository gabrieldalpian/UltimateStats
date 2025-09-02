package com.pl.UltimateStats.player;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "nation")
    private String nation;

    @Column(name = "team_id")
    private Integer teamId; 

    @Column(name = "pos")
    private String pos;

    public Player() {}

    public Player(String name, String nation, Integer teamId, String pos) {
        this.name = name;
        this.nation = nation;
        this.teamId = teamId;
        this.pos = pos;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getNation() { return nation; }
    public void setNation(String nation) { this.nation = nation; }

    public Integer getTeamId() { return teamId; }
    public void setTeamId(Integer teamId) { this.teamId = teamId; }

    public String getPos() { return pos; }
    public void setPos(String pos) { this.pos = pos; }
}
