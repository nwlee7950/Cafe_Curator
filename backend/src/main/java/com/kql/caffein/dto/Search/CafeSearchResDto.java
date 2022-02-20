package com.kql.caffein.dto.Search;

import com.kql.caffein.dto.Feed.FeedResDto;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
import java.util.Set;

@Getter
@Builder
public class CafeSearchResDto {
    @ApiModelProperty(example = "상위 키워드 2개")
    private Set<String> categoryList;

    @ApiModelProperty(example = "피드 총 개수")
    private int feedCount;

    @ApiModelProperty(example = "해당 카페를 등록한 피드 목록")
    private List<FeedResDto> feedList;
}
