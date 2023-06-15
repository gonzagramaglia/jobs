import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useCallback, useState } from "react";

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";
import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

import testData from "../../testData";

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {}

    const isLoading = false;
    const data = testData;
    const error = false;

    // const { data, isLoading, error, refetch } = useFetch('job-details', {
    //     job_id: params.id
    // });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }} >
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitle: '',
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension='60%'
                            handlePress={ () => router.back() }
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension='60%'
                        />
                    )
                }}
            />

            <>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    {isLoading 
                        ? (<ActivityIndicator size="large" color={COLORS.primary} />)
                        : error 
                            ? (<Text>Something went wrong</Text>)
                            : data.length === 0
                                ? (<Text>No data</Text>)
                                : (   
                                    <View style={{ padding: SIZES.medium, paddingBottom: 100 }} >
                                        <Company 
                                            companyLogo={data[0].employer_logo}
                                            jobTitle={data[0].job_title}
                                            companyName={data[0].employer_name}
                                            location={data[0].job_location}
                                        />

                                        <JobTabs 
                                        
                                        />
                                    </View>
                                  ) 
                    }
                </ScrollView>
            </>

        </SafeAreaView>
    )
}

export default JobDetails