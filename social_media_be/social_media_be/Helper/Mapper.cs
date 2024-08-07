﻿using AutoMapper;
using social_media_be.Entities;
using social_media_be.Models.Post;
using social_media_be.Models.User;

namespace social_media_be.Helper
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<User, UserModel>().ForMember(dest => dest.Cover, opt => opt.MapFrom(src => src.coverImage)).ReverseMap();
            CreateMap<Post, PostModel>().ForMember(dest => dest.Image, opt => opt.Ignore()).ReverseMap().ForMember(dest => dest.Image, opt => opt.Ignore());
            CreateMap<Comment, CommentModel>().ReverseMap();
            CreateMap<Vote, VoteModel>().ReverseMap();
        }
    }
}
